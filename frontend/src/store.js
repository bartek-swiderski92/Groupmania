import React, { useEffect } from 'react';

export function usePersistedState(key) {
    const [state, setState] = React.useState(
        () => localStorage.getItem(key) || null
    );
    useEffect(() => {
        localStorage.setItem(key, state);
    }, [key, state])

    return [state, setState]
}