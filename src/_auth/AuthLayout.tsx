import {Outlet, Navigate} from "react-router-dom"

function AuthLayout() {
    const isAuthenticate = false;
  return (
  <>
  {
    isAuthenticate?(
       <Navigate to="/"/>
    ):
    (
      <>
    <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet/>
    </section>
    <img 
    src="/public/assets/images/side-img.svg" 
    alt="" 
    className="hidden md:block h-screen w-1/2 object-cover bg-no-repeat "/>
</>
    )
  }
  </>
  )
}

export default AuthLayout
