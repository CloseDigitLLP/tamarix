const customStyles = {
    container: (styles) => ({ ...styles, background: 'white', outline: 'none', borderRadius: 90, justifyContent: 'space-between', display: 'flex', paddingLeft: 10, paddingRight: 20, minWidth: 300, maxWidth:'40%', border: 'none'}),
    control: (styles, {isFocused, isSelected}) => ({ ...styles, flex: 1, background: 'transparent', border: 'none', minHeight:50,  fontSize: 18, fontWeight: 400, letterSpacing: 0.5,  ':hover': { borderColor: '#fff', boxShadow: 'none', border: 'none' } }),
    indicatorSeparator: () => ({ display: 'none' }),
    indicatorsContainer: (styles) => ({ ...styles }),
    dropdownIndicator: (styles) => ({ ...styles, background: '#65A8C9', color: 'white', borderRadius: 99 }),
    menu: (styles) => ({ ...styles, zIndex: 9 }),
    option: (styles, {isFocused, isSelected}) =>{
        return{
            ...styles,
            cursor: 'pointer',
            'hover' : {backgroundColor:'#65a9c98a'},
            backgroundColor: isSelected ? '#65a9c98a' : '#fff',
            boxShadow: undefined,
            ':active' : {backgroundColor:'#65a9c98a'}
        };
    }
}

export default customStyles