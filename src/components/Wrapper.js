import {
    useNavigate,
    useParams
  } from "react-router-dom";

export default function Wrapper (props) {
    let { Component } = props
    let params = useParams();
    let navigate = useNavigate();
    return (
        <Component {...props} {...{params, navigate}} />
    )
}