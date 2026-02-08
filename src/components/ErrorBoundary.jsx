import React from 'react';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.state = { hasError: true, error, errorInfo };
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
            
            .error-boundary-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: linear-gradient(168.09deg, #131CC3 0%, #FFFFFF 98.77%);
              padding: 30px;
              font-family: 'Itim', cursive;
            }

            .error-boundary-icon {
              font-size: 80px;
              margin-bottom: 20px;
            }

            .error-boundary-title {
              font-size: 48px;
              color: #FFFFFF;
              margin: 0 0 20px 0;
              text-align: center;
            }

            .error-boundary-message {
              font-size: 24px;
              color: rgba(255, 255, 255, 0.9);
              margin: 0 0 30px 0;
              text-align: center;
              max-width: 400px;
            }

            .error-boundary-button {
              font-family: 'Itim', cursive;
              font-size: 24px;
              padding: 15px 40px;
              background: linear-gradient(90deg, #FFFFFF 0%, #FFF200 100%);
              border: none;
              border-radius: 15px;
              color: #000000;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }

            .error-boundary-button:hover {
              transform: translateY(-3px);
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }

            .error-boundary-button:active {
              transform: translateY(-1px);
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }
          `}</style>

                    <div className="error-boundary-container">
                        <div className="error-boundary-icon">💥</div>
                        <h1 className="error-boundary-title">Oops!</h1>
                        <p className="error-boundary-message">
                            Something went wrong. Don't worry, we'll get you back on track.
                        </p>
                        <button className="error-boundary-button" onClick={this.handleReset}>
                            Go to Home
                        </button>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
