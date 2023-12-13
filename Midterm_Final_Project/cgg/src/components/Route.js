import useNavigation from '../hooks/useNavigation.js'


export default function Route({path, children}) {
  const {currentPath} = useNavigation()

  if (path === currentPath) {
    return children
  }
  return null
}