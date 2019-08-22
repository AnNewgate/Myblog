import React from 'react';
import ReactDom from 'react-dom';
import Editor from 'wrap-md-editor';

class BlogEdit extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Editor config={
                    {
                        markdown: // testEditor.getMarkdown().replace(/`/g, '\\`')
                            `## Test
                    \`\`\`
                    console.log('what can i do for you')
                    \`\`\`
                    
                    # 123123`,
                        onload: (editor, func) => {
                            let md = editor.getMarkdown();
                            let html = editor.getHTML();
                            debugger
                        }
                    }
                } />
            </div>
        );
    }
}

ReactDom.render(
    <BlogEdit />,
    document.getElementById("editor")
)