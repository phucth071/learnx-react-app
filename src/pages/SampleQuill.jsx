import RichTextEditor from '@components/RichTextEditor.jsx';

const SampleQuill = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-2xl font-bold mb-5 text-center">Rich Text Editor</h1>
                    <RichTextEditor />
                </div>
            </div>
        </div>
    );
};

export default SampleQuill;

