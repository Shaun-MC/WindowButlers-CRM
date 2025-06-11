import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doSignInWithMicrosoft } from '../../firebase/auth'
import { useAuth } from '../../contexts/auth'
import './login.css' // Import the CSS file

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // Handle form input changes
    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))
    }

    // Generic sign-in handler
    const handleSignIn = async (signInMethod, resetForm = false) => {
        if (isSigningIn) return

        setIsSigningIn(true)
        setErrorMessage('')

        try {
            await signInMethod()
        } catch (err) {
            setErrorMessage(err.message)
        } finally {
            setIsSigningIn(false)
            if (resetForm) {
                setFormData({ email: '', password: '' })
            }
        }
    }

    // Sign-in method handlers
    const handleEmailSignIn = (e) => {
        e.preventDefault()
        handleSignIn(() => doSignInWithEmailAndPassword(formData.email, formData.password))
    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault()
        handleSignIn(doSignInWithGoogle)
    }

    const handleMicrosoftSignIn = (e) => {
        e.preventDefault()
        handleSignIn(doSignInWithMicrosoft)
    }

    // Redirect if already logged in
    if (userLoggedIn) {
        return <Navigate to="/home" replace />
    }

    return (
        <main className="login-container">
            <div className="login-card">
                <WelcomeHeader />

                <EmailPasswordForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSubmit={handleEmailSignIn}
                    isSigningIn={isSigningIn}
                    errorMessage={errorMessage}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />

                <SocialSignInButtons
                    onGoogleSignIn={handleGoogleSignIn}
                    onMicrosoftSignIn={handleMicrosoftSignIn}
                    isSigningIn={isSigningIn}
                />
            </div>
        </main>
    )
}

// Extracted sub-components with CSS classes
const WelcomeHeader = () => (
    <div className="welcome-header">
        <div className="welcome-header__content">
            <h3 className="welcome-header__title">Login</h3>
        </div>
    </div>
)

const EmailPasswordForm = ({ formData, onInputChange, onSubmit, isSigningIn, errorMessage, showPassword, setShowPassword }) => (
    <form onSubmit={onSubmit} className="login-form">
        <FormField
            label="Email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={onInputChange('email')}
            required
        />

        <FormField
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={formData.password}
            onChange={onInputChange('password')}
            required
            showToggle={true}
            isVisible={showPassword}
            onToggleVisibility={() => setShowPassword(!showPassword)}
        />

        {errorMessage && (
            <ErrorMessage message={errorMessage} />
        )}

        <SubmitButton isSigningIn={isSigningIn} />
    </form>
)

const FormField = ({ label, type, autoComplete, value, onChange, required, showToggle, isVisible, onToggleVisibility }) => (
    <div className="form-field">
        <label className="form-field__label">
            {label}
        </label>
        <div className="form-field__input-container">
            <input
                type={type}
                autoComplete={autoComplete}
                required={required}
                value={value}
                onChange={onChange}
                className="form-field__input"
            />
            {showToggle && (
                <button
                    type="button"
                    onClick={onToggleVisibility}
                    className="password-toggle"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                >
                    {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            )}
        </div>
    </div>
)

const EyeIcon = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
)

const EyeOffIcon = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
)

const ErrorMessage = ({ message }) => (
    <span className="error-message">{message}</span>
)

const SubmitButton = ({ isSigningIn }) => (
    <button
        type="submit"
        disabled={isSigningIn}
        className={`submit-button ${isSigningIn ? 'submit-button--loading' : ''}`}
    >
        {isSigningIn ? 'Signing In...' : 'Sign In'}
    </button>
)

const SocialSignInButtons = ({ onGoogleSignIn, onMicrosoftSignIn, isSigningIn }) => (
    <div className="social-signin">
        <SocialSignInButton
            onClick={onGoogleSignIn}
            isSigningIn={isSigningIn}
            icon={<GoogleIcon />}
            text="Continue with Google"
        />
        <SocialSignInButton
            onClick={onMicrosoftSignIn}
            isSigningIn={isSigningIn}
            icon={<MicrosoftIcon />}
            text="Continue with Microsoft"
        />
    </div>
)

const SocialSignInButton = ({ onClick, isSigningIn, icon, text }) => (
    <button
        disabled={isSigningIn}
        onClick={onClick}
        className={`social-signin__button ${isSigningIn ? 'social-signin__button--loading' : ''}`}
    >
        <span className="social-signin__icon">{icon}</span>
        <span className="social-signin__text">{isSigningIn ? 'Signing In...' : text}</span>
    </button>
)

// Icon components
const GoogleIcon = () => (
    <svg className="icon icon--google" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_17_40)">
            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
        </g>
        <defs>
            <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white" />
            </clipPath>
        </defs>
    </svg>
)

const MicrosoftIcon = () => (
    <svg className="icon icon--microsoft" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H24V24H0V0Z" fill="#F25022" />
        <path d="M24 0H48V24H24V0Z" fill="#7FBA00" />
        <path d="M0 24H24V48H0V24Z" fill="#00A4EF" />
        <path d="M24 24H48V48H24V24Z" fill="#FFB900" />
    </svg>
)

export default Login