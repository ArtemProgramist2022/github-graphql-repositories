export interface LoadingProps {
  fullScreen?: boolean
  size?: LoadingSize
  zIndex?: number
}

export type LoadingSize = 'small' | 'medium' | 'large'
