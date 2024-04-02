import {useRemarkSync} from "react-remark";

export type MarkdownProps = {
    readonly markdown: string;
}

export default function Markdown(props: MarkdownProps) {
    const {markdown} = props;
    return useRemarkSync(markdown, {
        rehypeReactOptions: {
            components: {
                p(props: any) {
                    return <p {...props} className='mb-2'/>;
                },
                h1(props: any) {
                    return <p {...props} className=''/>;
                },
                blockquote(props: any) {
                    return <blockquote {...props} className='bg-stone-200 italic px-2 border-l-8 border-stone-300'/>
                }
            }
        }
    });
}
