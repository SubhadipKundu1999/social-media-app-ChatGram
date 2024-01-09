
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { signupValidationSchema } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"


function SignupForm() {
  const isLoading = false;
  const { toast } = useToast()

    // 1. Define your form.

  const form = useForm<z.infer<typeof signupValidationSchema>>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      name:"",
      username: "",
      email:"",
      password:"",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const newUser = await createUserAccount(values);
    if(!newUser) {
      return  toast({
        title:' sign up failed. Please try again'
       })
    }
   
  }

  

  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src="/public/assets/images/logo.svg"></img>
        <h2 className="h3-bold md:h2-bold pt-3 sm:pt-10"> Create a new Account</h2>
        <p className="text-light-3  small-medium md:bas-regular"> To use Snapgram enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)}
         className="flex-col w-full gap-4 mt-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="shad-button_primary w-full mt-3">
            {
              isLoading?(
             <div className="flex-center gap-2">
              <Loader/> Loading...
             </div>
                
              ):(
                "Signup"
              )
            }
          </Button>
          <p className="text-small text-light-3 text-center mt-4">Already have an account? 
          <Link className="text-primary-500" to={"/sign-in"}>log in</Link>
          </p>
        </form>

    </div>
  </Form>

  )
}

export default SignupForm
