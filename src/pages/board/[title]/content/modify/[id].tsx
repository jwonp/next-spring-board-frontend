import styles from "@src/styles/board/content/Modify.module.scss";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ContentEdit from "../edit";
import { ModifyContent } from "@src/static/types/ModifyContentType";
import { getContentShortById } from "@src/components/func/RequestFuncs";
import qs from "qs";
import { ParsedContent } from "@src/static/types/ParsedContentType";
import { ContentBarData } from "@src/static/types/ContentDataType";
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

export const getServerSideProps: GetServerSideProps<ModifyContent> = async (
  context
) => {
  const { id } = context.query;
  const rowReturnData = (await getContentShortById(id as string)).data;
  const parsedContents = qs.parse(rowReturnData.content, {
    parseArrays: true,
  }) as unknown as ParsedContent;
  const returnData: ModifyContent = {
    contentId: rowReturnData.contentId,
    preTitle: rowReturnData.title,
    preContents: Object.values(parsedContents) as ContentBarData[],
  };
  return {
    props: { ...returnData },
  };
};
export default Modify;
