import Link from "next/link";

export default function DetailRow({ label, value, museumUrl, children }) {
    const renderValue = () => {
        if (typeof value === 'string') {
            return value.split('\n').map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ));
        }
        return value;
    };

    return (
        <div className="flex flex-col border-b border-gray-300 py-3">
            <div className="flex w-full">
                <span className="min-w-[7rem] flex-shrink-0 font-semibold text-gray-700">{label}</span>
                <div className="flex flex-col w-full min-w-0">
                    <span className="text-gray-900 whitespace-normal break-words">{renderValue()}</span>
                    {museumUrl && (
                        <Link
                            href={museumUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline cursor-pointer whitespace-normal break-words"
                        >
                            {museumUrl}
                        </Link>
                    )}
                </div>
            </div>
            {children && <div className="mt-2">{children}</div>}
        </div>
    );
}