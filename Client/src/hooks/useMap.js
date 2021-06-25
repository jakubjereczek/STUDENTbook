import { useEffect, useState } from 'react';

function useSet() {

    const [state, setState] = useState(() => new Map());

    const addItem = async (key, value) => {
        if (await getItem(key) !== undefined)
            return;

        return new Promise((resolve => {
            resolve(setState(prev => prev.set(key, value)))
        }))
    }

    const removeItem = key => {
        setState(prev => {
            const next = new Map(prev);
            next.delete(key);

            return next;
        });
    }

    const getItem = async key => {
        return new Promise((resolve) => {
            const values = state.get(key);
            resolve(values)
        })
    }

    return [addItem, removeItem, getItem];
}

export default useSet;