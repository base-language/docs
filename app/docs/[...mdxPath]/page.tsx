import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "@/mdx-components.jsx";

export const generateStaticParams = generateStaticParamsFor("mdxPath");
export async function generateMetadata(props: any) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}
const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: any) {
  const params = await props.params;
  const {
    default: MDXContent,
    toc,
    metadata,
    //@ts-ignore
    sourceCode,
  } = await importPage(params.mdxPath);
  return (
    <Wrapper toc={toc} metadata={metadata} sourcecode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
