import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { css, StyleSheet } from "aphrodite";
import { ID } from "~/config/types/root_types";
import { isEmpty } from "~/config/utils/nullchecks";
import {
  NewPostButtonContext,
  NewPostButtonContextType,
  NewPostButtonContextValues,
} from "../contexts/NewPostButtonContext";
import { NextRouter, useRouter } from "next/router";
import { PaperSubmissionStatus } from "../Paper/UploadWizard/types/PaperUploadWizardTypes";
import {
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import colors from "~/config/themes/colors";
import icons from "~/config/themes/icons";
import withWebSocket from "../withWebSocket";

type Props = {
  isNewPostModalOpen: boolean;
  wsResponse: any /* socket */;
  wsSend: (payload: any) => void /* socket */;
};
type GetToastBodyArgs = {
  paperID: ID;
  paperUploadStatus: PaperSubmissionStatus;
  router: NextRouter;
  setUploaderContextValues: (values: NewPostButtonContextValues) => void;
  uploaderContextValues: NewPostButtonContextValues;
};

const getToastBody = ({
  paperID,
  paperUploadStatus,
  router,
  setUploaderContextValues,
  uploaderContextValues,
}: GetToastBodyArgs): [
  boolean /* shouldRender */,
  ReactNode /* toastBody */
] => {
  switch (paperUploadStatus) {
    case "COMPLETE":
      return [
        true,
        <div
          className={css(styles.toastBody)}
          onClick={(_event: SyntheticEvent): void => {
            router.push(`/paper/${paperID}/new-upload`);
          }}
        >
          <div className={css(styles.toastBodyTitle)}>{"PAPER UPLOADED"}</div>
          <div className={css(styles.toastSubtext)}>
            <span style={{ marginRight: 6, color: colors.GREEN(1) }}>
              {icons.checkCircle}
            </span>
            {"Click here to complete next steps"}
          </div>
        </div>,
      ];
    case "PROCESSING":
    case "PROCESSING_MANUBOT":
    case "FAILED_DOI":
      return [
        true,
        <div
          className={css(styles.toastBody)}
          onClick={(): void => {
            setUploaderContextValues({
              ...uploaderContextValues,
              doi: null,
              isOpen: true,
              isWithDOI: true,
              wizardBodyType: "doi_upload",
            });
          }}
        >
          <div className={css(styles.toastBodyTitle)}>
            {"FAILED TO GET DOI"}
          </div>
          <div className={css(styles.toastSubtext)}>
            <span style={{ marginRight: 6, color: colors.RED(1) }}>
              {icons.exclamationCircle}
            </span>
            {
              "We weren't able to get DOI from the source. Click here to try again by providing DOI"
            }
          </div>
        </div>,
      ];
    case "FAILED_DUPLICATE":
      return [
        true,
        <div className={css(styles.toastBody)}>
          <div className={css(styles.toastBodyTitle)}>
            {"PAPER UPLOADED FAILED"}
          </div>
          <div className={css(styles.toastSubtext)}>
            <span style={{ marginRight: 6, color: colors.RED(1) }}>
              {icons.exclamationCircle}
            </span>
            {"Please try again later or upload with a PDF"}
          </div>
        </div>,
      ];
    default:
      return [false, null];
  }
};

function PaperUploadStateNotifier({
  wsResponse,
  wsSend,
}: Props): ReactElement<typeof ToastContainer> {
  const router = useRouter();
  const { values: uploaderContextValues, setValues: setUploaderContextValues } =
    useContext<NewPostButtonContextType>(NewPostButtonContext);
  const { isOpen: isUploadModalOpen, paperID: PaperID } = uploaderContextValues;
  const parsedWsResponse = JSON.parse(wsResponse);
  const {
    paper_status: paperUploadStatus,
    paper: msgPaperID,
    status_read: isNotificationRead,
    id: paperSubmissionID,
  } = parsedWsResponse?.data ?? {};
  console.warn("wsResponse: ", parsedWsResponse?.data);

  const markAsRead = () => wsSend({ paper_submission_id: paperSubmissionID });

  useEffect((): void => {
    if (!isEmpty(wsResponse) && !isNotificationRead) {
      const paperIDsMatch = msgPaperID === PaperID;
      if (isUploadModalOpen && paperIDsMatch) {
        // console.warn("mark notification as read & dont show notification");
        markAsRead();
      } else if (!isUploadModalOpen) {
        const bodyResult = getToastBody({
          paperID: msgPaperID,
          paperUploadStatus,
          router,
          setUploaderContextValues,
          uploaderContextValues,
        });
        bodyResult[0] && toast(bodyResult[1]);
      }
    }
  }, [
    PaperID,
    isNotificationRead,
    isUploadModalOpen,
    msgPaperID,
    paperUploadStatus,
  ]);

  return (
    <ToastContainer
      autoClose={false}
      closeOnClick
      onClick={markAsRead}
      hideProgressBar={false}
      limit={1} /* render only 1 at a time */
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position="bottom-right"
      rtl={false}
    />
  );
}

const styles = StyleSheet.create({
  toastBody: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: 8,
  },
  toastBodyTitle: {
    borderBottom: `1px solid ${colors.LIGHT_GREY_BORDER}`,
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 4,
    paddingBottom: 4,
  },
  toastSubtext: {
    fontSize: 12,
    fontWeight: 400,
    marginTop: 4,
  },
});
const mapStateToProps = (_state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withWebSocket(
  // @ts-ignore legacy hook
  connect(mapStateToProps, mapDispatchToProps)(PaperUploadStateNotifier)
);
