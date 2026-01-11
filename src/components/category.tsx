interface CategoriesProps {
    cagtegoriesProps: string;
    setCurrentTabHandler: (tab: string) => void;
    currentTab: string;
}

export function Categories({ cagtegoriesProps, setCurrentTabHandler, currentTab }: CategoriesProps) {
    const isActive = currentTab === cagtegoriesProps;
    
    return (
        <button
            onClick={() => setCurrentTabHandler(cagtegoriesProps)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
                isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
        >
            {cagtegoriesProps}
        </button>
    );
}