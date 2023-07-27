import { CSVLink } from "react-csv"
import { Data } from "react-csv/components/CommonPropTypes"

export default function CSVDownload(props: { data: Data; filename: string; csvRef: any }) {
    console.log("CSV Download data: ", props.data)
  return (
    <CSVLink
      data={props.data}
      ref={(r: any) => (props.csvRef.current = r)}
      filename={props.filename}
    >
      {/* <i style={{ color: "white" }} className="fa-regular fa-xl fa-file-excel"></i> */}
    </CSVLink>
  )
}
