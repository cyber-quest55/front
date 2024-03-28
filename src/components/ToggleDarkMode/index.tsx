import { BsSun, BsMoon } from "react-icons/bs";

export const ToggleDarkMode = ({ initialState, setInitialState, }) => {
    const { settings } = initialState

    const style = {
        cursor: 'pointer',
        padding: '8px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        verticalAlign: 'middle',
    }

    const toggleDark = () => {
        setInitialState((preInitialState: any) => {
            document.documentElement.setAttribute(
                'data-prefers-color-scheme',
                initialState?.settings?.navTheme === 'realDark' ? 'light' : 'dark'
            )
            return ({
                ...preInitialState,
                settings: {
                    ...settings,
                    navTheme: initialState?.settings?.navTheme === 'realDark' ? 'light' : 'realDark',
                },

            })
        })
    }

    return <span onClick={toggleDark} style={style} >
        {initialState?.settings?.navTheme === 'realDark' ? <BsMoon /> : <BsSun />}
    </span>
}