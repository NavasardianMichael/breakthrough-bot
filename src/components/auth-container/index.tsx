import userManager from 'api/auth/config';
import { signinRedirect } from 'api/auth/service';
import { FC, PropsWithChildren, useEffect } from 'react'

const AuthContainer: FC<PropsWithChildren> = ({ children }) => {

  useEffect(() => {
    if (import.meta.env.PROD) {
      userManager.events.addUserSignedOut(() => {
        signinRedirect();
      });
    }
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default AuthContainer