import { Value } from "slate";
import Plain from "slate-plain-serializer";

import { getNestedValue } from "./index";

export function createUsername({ createdBy }) {
  const { firstName, lastName } = createdBy;
  return `${firstName} ${lastName}`;
}

export function convertToEditorValue(text) {
  if (Value.isValue(text)) {
    return text;
  }

  if (typeof text === "string") {
    return Plain.deserialize(text);
  }

  try {
    return Value.fromJSON(text);
  } catch {
    return undefined;
  }
}

export function getCurrentUser(storeObject) {
  return getNestedValue(storeObject, ["auth", "user"], null);
}

export function getVoteType(vote) {
  return vote && vote.voteType;
}