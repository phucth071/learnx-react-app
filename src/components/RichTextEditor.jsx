import { useState, createRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = () => {
    const [editorContent, setEditorContent] = useState('');
    const editorRef = createRef();

    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const handleChange = (content) => {
        setEditorContent(content);
    };

    const logContent = () => {
        console.log(editorContent);
    };

    return (
        <div className="">
            <div className="container mx-auto p-4">
                <ReactQuill
                    ref={editorRef}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={editorContent}
                    onChange={handleChange}
                    className="bg-white mb-28 h-32"
                />
                <button
                    onClick={logContent}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Log Content
                </button>
                <div className="p-4" dangerouslySetInnerHTML={{ __html: editorContent }}
                     style={{ whiteSpace: 'pre-wrap' }} />
            </div>
        </div>
    );
};

export default RichTextEditor;
