type Args = {
  width?: number;
  height?: number;
};

const CoinStackIcon = ({ height = 20, width = 20 }: Args) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9616 7.59635C12.797 7.59635 12.6342 7.60423 12.4733 7.61878V4.60156C12.4733 3.75485 11.8695 2.98665 10.7732 2.43851C9.7845 1.94414 8.48079 1.67188 7.10221 1.67188C5.72083 1.67188 4.40667 1.94359 3.40179 2.43691C2.28249 2.98649 1.66602 3.75521 1.66602 4.60156V13.4557C1.66602 14.3021 2.28249 15.0708 3.40179 15.6204C4.40667 16.1137 5.72083 16.3854 7.10221 16.3854C7.65589 16.3854 8.19749 16.3412 8.71729 16.2551C9.70072 17.5218 11.2375 18.3385 12.9616 18.3385C15.9232 18.3385 18.3327 15.9291 18.3327 12.9674C18.3327 10.0058 15.9232 7.59635 12.9616 7.59635ZM3.83219 3.31354C4.6931 2.89085 5.88496 2.64844 7.10221 2.64844C9.69199 2.64844 11.4967 3.67777 11.4967 4.60156C11.4967 5.52536 9.69199 6.55469 7.10221 6.55469C5.88496 6.55469 4.6931 6.31227 3.83219 5.88958C3.07617 5.51842 2.64258 5.04896 2.64258 4.60156C2.64258 4.15417 3.07617 3.6847 3.83219 3.31354ZM2.64258 6.3029C2.86146 6.47012 3.11497 6.62539 3.40179 6.76621C4.40667 7.25954 5.72083 7.53125 7.10221 7.53125C8.48079 7.53125 9.7845 7.25898 10.7732 6.76462C11.0453 6.62855 11.287 6.47894 11.4967 6.31794V7.79938C10.5236 8.07559 9.66214 8.61999 8.99746 9.34717C8.40254 9.48138 7.76582 9.54948 7.10221 9.54948C5.88496 9.54948 4.6931 9.30706 3.83219 8.88437C3.07617 8.51322 2.64258 8.04375 2.64258 7.59635V6.3029ZM2.64258 9.29769C2.86146 9.46491 3.11497 9.62018 3.40179 9.761C4.40667 10.2543 5.72083 10.526 7.10221 10.526C7.4792 10.526 7.84902 10.5058 8.20967 10.4662C7.88883 11.0733 7.68096 11.7488 7.61419 12.4647C7.44456 12.474 7.27353 12.4792 7.10221 12.4792C5.88496 12.4792 4.6931 12.2368 3.83219 11.8141C3.07617 11.4429 2.64258 10.9734 2.64258 10.526V9.29769ZM7.10221 15.4089C5.88496 15.4089 4.6931 15.1664 3.83219 14.7437C3.07617 14.3726 2.64258 13.9031 2.64258 13.4557V12.2273C2.86146 12.3946 3.11497 12.5498 3.40179 12.6907C4.40667 13.184 5.72083 13.4557 7.10221 13.4557C7.27246 13.4557 7.44268 13.4514 7.61178 13.4431C7.67168 14.1224 7.8585 14.7657 8.14844 15.3493C7.80794 15.3885 7.45824 15.4089 7.10221 15.4089ZM12.9616 17.362C10.5384 17.362 8.56706 15.3906 8.56706 12.9674C8.56706 10.5443 10.5384 8.57292 12.9616 8.57292C15.3847 8.57292 17.3561 10.5443 17.3561 12.9674C17.3561 15.3906 15.3847 17.362 12.9616 17.362Z"
        fill="#3971FF"
        stroke="#3971FF"
        stroke-width="0.333333"
      />
      <line
        x1="11.333"
        y1="12.8359"
        x2="14.4997"
        y2="12.8359"
        stroke="#3971FF"
        stroke-linecap="round"
      />
      <line
        x1="12.833"
        y1="14.5"
        x2="12.833"
        y2="11.3333"
        stroke="#3971FF"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default CoinStackIcon;
