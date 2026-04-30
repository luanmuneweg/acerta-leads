import { useEffect, useState } from 'react'

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false)

    useEffect(() => {
        const updateMatches = (mediaQuery: MediaQueryList | MediaQueryListEvent) => {
            setMatches(mediaQuery.matches)
        }

        if (typeof window !== 'undefined') {
            const mediaQueryList = window.matchMedia(query)

            updateMatches(mediaQueryList)

            mediaQueryList.addEventListener('change', updateMatches)

            return () => {
                mediaQueryList.removeEventListener('change', updateMatches)
            }
        }

        return () => {}
    }, [query])

    return matches
}

export default useMediaQuery
