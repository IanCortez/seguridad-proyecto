'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    });

    if (data) {
      setErrorMessage("");
      router.push(`/chat/${data.token}`);
    } else {
      setErrorMessage("Usuario o contraseña incorrecto(s)");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.sectionTitle}>Inicio de Sesión</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Iniciar Sesión</button>
        {
          errorMessage.length > 0 &&
          <p style={styles.errorMessage}>{errorMessage}</p>
        }
      </form>
      <br />
      <button style={styles.return}>
        <Link href="/" style={styles.link}> Volver </Link>
      </button>
    </div>
  );
}

const styles = {
  sectionTitle: {
    fontSize: '42px',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
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
};
