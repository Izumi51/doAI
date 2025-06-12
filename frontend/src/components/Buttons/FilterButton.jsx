function FilterButton({ onClick, name, active }) {
    return(<>
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg transition ${
                active
                ? "bg-[#123acc] text-white" 
                : "hover:bg-[#619afc] active:bg-[#619afc]"
            }`}
        >
            {name}  
        </button>
    </>)
}

export default FilterButton