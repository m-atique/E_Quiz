import { CourseProvider } from "./coursesContext";
import {SubjectProvider} from './subjectContext'


const CatalogProvider =({children})=>{
    return(
        <CourseProvider>
            <SubjectProvider>
            {children}
            </SubjectProvider>
        </CourseProvider>
    )
}

export default CatalogProvider