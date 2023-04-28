import styles from "@src/styles/board/content/Modify.module.scss";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ContentEdit from "../edit";
import { ModifyContentType } from "@src/static/types/ModifyContentType";
import { getContentShortById } from "@src/components/func/sendRequest";
import qs from "qs";
import { ParsedContentType } from "@src/static/types/ParsedContentType";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
const Modify = ({
  contentId,
  preTitle,
  preContents,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ContentEdit
      contentId={contentId}
      preTitle={preTitle}
      preContents={preContents}
    />
  );
};

export const getServerSideProps: GetServerSideProps<ModifyContentType> = async (
  context
) => {
  const { id } = context.query;
  const rowReturnData = (await getContentShortById(id as string)).data;
  const parsedContents = qs.parse(rowReturnData.content, {
    parseArrays: true,
  }) as unknown as ParsedContentType;
  const returnData: ModifyContentType = {
    contentId: rowReturnData.contentId,
    preTitle: rowReturnData.title,
    preContents: Object.values(parsedContents) as ContentBarDataType[],
  };
  return {
    props: { ...returnData },
  };
};
export default Modify;
