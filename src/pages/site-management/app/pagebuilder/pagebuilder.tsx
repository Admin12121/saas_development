import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "@/components/global/loader";
import PagebuilderForm  from "@/pages/site-management/app/pagebuilder/_components/pageBuilder";

const Pagebuilder = () => {
    const { page_type } = useParams();
  return (
    <PagebuilderForm/>
  )
}

export default Pagebuilder