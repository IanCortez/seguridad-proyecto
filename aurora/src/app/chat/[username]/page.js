
export default async function Page({ params }) {
    const username = (await params).username;

    return (
        <>
            <div style={styles.pageView}>
                <div style={styles.userView}>
                    <h3 style={styles.username}>{username}</h3>
                    {
                    }
                </div>
                <div >

                </div>
                <div style={styles.chatView}>
                    <div style={styles.textsView}>
                        <p>Textos</p>
                    </div>
                    <input type="text" placeholder="Escbire algo" />
                </div>
            </div>
        </>
    );
}

const styles = {
  pageView: {
    display: 'grid',
    gridTemplateColumns: '200px 50px auto',
    height: '100vh',
    align: 'center',
  },
  userView: {
    backgroundColor: '#22193e',
    borderRadius: '15px',
    marginLeft: '20px',
    marginTop: '20px',
    marginBottom: '20px'
  },
  chatView: {
  },
  input: {
    padding: '10px',
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  link: {
    marginTop: '20px',
    color: '#ffffff',
  },
  errorMessage: {
    fontSize: '10px',
    color: 'red',
  },
  return: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '30px',
    backgroundColor: '#063873',
    width: '15%',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  username: {
    fontSize: '20px',
  }
};
