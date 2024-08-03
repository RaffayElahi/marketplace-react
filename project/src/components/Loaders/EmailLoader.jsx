export default function EmailLoader({fullscreen}) {
    return (
      <div className={(fullscreen)?"flex justify-center items-center w-full h-[100vh]" :
       "flex justify-center items-center w-full h-[80vh]"}>
        <div
          style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            border: '4px solid transparent',
            borderTopColor: 'transparent',
            borderRightColor: '#3498db',
            borderBottomColor: '#3498db',
            borderLeftColor: '#3498db',
            borderWidth: '4px',
            borderStyle: 'solid',
            background: 'linear-gradient(45deg, rgba(52, 152, 219, 0.3) 25%, transparent 25%, transparent 50%, rgba(52, 152, 219, 0.3) 50%, rgba(52, 152, 219, 0.3) 75%, transparent 75%, transparent)',
            backgroundSize: '16px 16px',
            animation: 'spin 1s linear infinite',
          }}
          className="relative"
        ></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }