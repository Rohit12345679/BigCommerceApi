
import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'

const App = ({ locale = 'en-US', children }) => {
  return (
    <CommerceProvider locale={locale}>
      {children}
    </CommerceProvider>
  )
}