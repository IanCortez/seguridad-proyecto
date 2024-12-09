'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import validator from 'validator';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: ''});

  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    if (form.password.length > 0) {
      if (validator.isStrongPassword(form.password, {
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })) {
        setErrorMessage("");
      } else {
        setErrorMessage("La contraseña debe ser al menos de 8 caracteres, usar al menos un caracter especilal y alfanumerico");
      }
    } else {
      setErrorMessage("");
    }

    if (form.confirmPassword.length > 0) {
      if (form.password.localeCompare(form.confirmPassword) === 0) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    } else {
      setPasswordMatch(true);
    }
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( passwordMatch && errorMessage.length === 0 && form.confirmPassword.length > 0 ) {
      const data = {
        username: form.username,
        password: form.password
      };
      let response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response.text());
      if (response.ok) {
        response = await fetch("/api", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username: form.username})
        })
        
        if (response.ok) {
          router.push("/login");
        }
      }

    } else {
      alert("Contraseñas no coinciden")
    }

  };

  return (
    <div style={styles.container}>
      <h1 style={styles.sectionTitle}>Registro</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        {
          errorMessage.length > 0 && 
          <div style={styles.passwordError}>
            <p>{errorMessage}</p>
          </div>
        }
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          style={styles.input}
          required
        />
        {
          !passwordMatch && 
          <div style={styles.passwordError}>
            <p>Las contraseñas deben coincidir</p>
          </div>
        }
        <button type="submit" style={styles.button}>Registrarse</button>
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
    color: '#fff',
  },
  passwordError: {
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
