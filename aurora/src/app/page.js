import Link from 'next/link';

export default function Home() {
  return (
    <div style={styles.container}>
      <br />
      <div style={styles.titleCard}>
        <h1 style={styles.welcome}>Bienvenido a</h1>
        <h1 style={styles.name}>Aurora</h1>
      </div>
      <br />
      <div style={styles.links}>
        <div>
          <button style={styles.linkContainer}>
            <Link href="/register" style={styles.link}> Registro </Link>
          </button>
        </div>
        <br />
        <div>
          <button style={styles.linkContainer}>
            <Link href="/login" style={styles.link}> Iniciar sesión </Link>
          </button>
        </div>
        <br />
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#323f47',
    textAlign: 'center',
    marginTop: '70px',
    marginBottom: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '50px',
    width: '40%',
  },
  titleCard: {
    marginTop: '20px',
    marginBottom: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: '50%',
    backgroundColor: '#646667',
    borderRadius: '10px',
  },
  welcome: {
    paddingBottom: '30px',
    paddingTop: '30px',
    fontSize: '32px',
  },
  name: {
    paddingBottom: '30px',
    fontSize: '40px',
  },
  linkContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '30px',
    backgroundColor: '#063873',
    width: '30%',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  links: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '20px',
    verticalAlign: 'middle',
  },
  link: {
    textAlign: 'center',
    color: '#ffffff',
  },
};
