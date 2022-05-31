type TLink = {
  name: string
  href: string
}

type TNavigation = {
  pages: TLink[]
}

export const navigation: TNavigation = {
  pages: [
    // { name: 'Home', href: '/' },
    { name: 'Lottery', href: '/lottery' },
    { name: 'Prizes', href: '/prizes' },
    { name: 'Account', href: '/account' },
  ],
}
