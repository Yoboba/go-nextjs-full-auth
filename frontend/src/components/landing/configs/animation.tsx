export function useAnimation() {
    const errorPopUp = {
        hidden : {
            y : -10,
            opacity : 0
        },
        visible : {
            y : 0,
            opacity : 1
        },
        exit : {
            y : -10,
            opacity : 0
        }
    }
    return {errorPopUp}
}

