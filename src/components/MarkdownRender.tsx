/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export function MarkdownRender({ content }: { content: string }) {
    let rowIndex = 0;
    return (
    <div className="prose max-w-none text-base space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          li: ({node, ...props }) => (
            <li className="my-1" {...props} />
          ),
        //   p: ({node, ...props }) => (
        //     <p className="mb-2" {...props} />
        //   ),
        //   ul: ({node, ...props }) => (
        //     <ul className="list-disc pl-8 mb-5" {...props} />
        //   ),
        //   ol: ({node, ...props }) => (
        //     <ol className="list-decimal pl-8 mb-5" {...props} />
        //   ),
          h2: ({node, ...props }) => (
            <h2 className="text-xl font-semibold mb-2" {...props} />
          ),
          h3: ({node, ...props }) => (
            <h3 className="text-lg font-semibold mb-2" {...props} />
          ),
          h4: ({node, ...props }) => (
            <h4 className="text-base font-semibold mb-2" {...props} />
          ),
          h5: ({node, ...props }) => (
            <h5 className="text-base font-semibold mb-2" {...props} />
          ),
          h6: ({node, ...props }) => (
            <h6 className="text-sm font-semibold mb-2" {...props} />
          ),
          a: ({node, ...props }) => (
            <a className="text-blue-500" {...props} target="_blank" rel="noopener noreferrer"/>
          ),
          img: ({node, ...props }) => (
            <img className="w-full" {...props} />
          ),
          // Ensure proper line breaks
          p: ({children, ...props}) => (
            <p style={{marginBottom: '1em'}} {...props}>{children}</p>
          ),
          // List styling
          ul: ({children, ...props}) => (
            <ul className="list-disc" style={{paddingLeft: '2em', marginBottom: '1em'}} {...props}>{children}</ul>
          ),
          ol: ({children, ...props}) => (
            <ol className="list-decimal" style={{paddingLeft: '2em', marginBottom: '1em'}} {...props}>{children}</ol>
          ),
          // Styled table components
          table: ({children, ...props}) => {
            rowIndex = 0; // Reset row counter for each table
            return (
              <table style={{borderCollapse: 'collapse', width: '100%', marginBottom: '1em'}} {...props}>{children}</table>
            );
          },
          thead: ({children, ...props}) => (
            <thead style={{backgroundColor: '#f3f4f6'}} {...props}>{children}</thead>
          ),
          th: ({children, ...props}) => (
            <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}} {...props}>{children}</th>
          ),
          tbody: ({children, ...props}) => (
            <tbody {...props}>{children}</tbody>
          ),
          tr: ({children, ...props}) => {
            // Skip incrementing for header rows
            if (((props.node as unknown as HTMLElement)?.parentNode as HTMLElement)?.tagName !== 'thead') {              
                rowIndex++;
            }
            const backgroundColor = rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb';

            return (
              <tr style={{backgroundColor, borderBottom: '1px solid #ddd'}} {...props}>{children}</tr>
            );
          },
          td: ({children, ...props}) => (
            <td style={{border: '1px solid #ddd', padding: '8px'}} {...props}>{children}</td>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}