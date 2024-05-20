import { queryFarm } from "@/models/farm";
import { useMount } from "ahooks"
import { connect } from "umi";
import React from "react"

function Initializer(props) {
    useMount(() => {
        props.queryFarm({})
    })
    return <></>
}

const mapStateToProps = ({ }: any) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    queryFarm: (props: any) => dispatch(queryFarm(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Initializer);


