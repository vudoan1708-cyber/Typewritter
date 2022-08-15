import { load } from "cheerio";
import { Document, Types } from "mongoose";
import { IDocumentDoc, IDocumentMethods } from "../models/document";

type NullableDocumentResponse =
  | (Document<unknown, any, IDocumentDoc> &
      IDocumentDoc & {
        _id: Types.ObjectId;
      } & IDocumentMethods)
  | null;

function countContentWords(content: string): number {
  const refinedContent = content.replaceAll(/\\/g, "");
  const $ = load(refinedContent);
  const innerText = $("body").text().replaceAll(/\s/g, "");
  return innerText.length ?? 1;
}

async function canUserViewDocument(
  document: NullableDocumentResponse,
  userId: string,
  passcode?: string
): Promise<NullableDocumentResponse> {
  try {
    if (!document || !document.isShared) return null;
    // NOTE: check if user is owner, if yes -> return
    if (document.ownerId.toString() === userId) return document;
    // NOTE: if not, then check the passcode
    if (!passcode) return null;
    const isValidPasscode = await document.comparePasscode(passcode);
    if (!isValidPasscode) return null;
    // NOTE: if passcode correct -> return
    return document;
  } catch (error) {
    throw error;
  }
}

export default { countContentWords, canUserViewDocument };
