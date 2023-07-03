export default function login() {
    return (
        <div>
            this is login page
        </div>
    );
}

export async function getServerSideProps(ctx){


    return {
        props:{
            data:null
        }
    }
}
