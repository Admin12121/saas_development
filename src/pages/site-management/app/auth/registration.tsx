// import FormSubmitComponent from "@/pages/site-management/app/formsubmission/page"
// import { useGetFormQuery } from "@/api/service/user_Auth_Api";
//   import Loader from "@/components/global/loader";
// import { useEffect, useState } from "react";
// import { FormElementInstance } from "@/pages/site-management/app/formbuilder/components/FormElements";
import UserRegistration from "@/pages/auth/components/dynamic-registration/user-registrations";
  

const SubdominRegistration = ({organization}:{organization:string | null}) => {
    // const [content, setContent] = useState<FormElementInstance[]>([])
    // const { data, isLoading: dataLoading } = useGetFormQuery({type});

    // useEffect(()=>{
    //     if (data){
    //         setContent(JSON.parse(data[0].content))
    //     }
    // },[data])

  return (
    // <Loader disable={!dataLoading} type="spinner">
    //     <FormSubmitComponent
    //         content={content}
    //     />
    // </Loader>
    <>
      <UserRegistration organization={organization}/>
    </>
  )
}

export default SubdominRegistration