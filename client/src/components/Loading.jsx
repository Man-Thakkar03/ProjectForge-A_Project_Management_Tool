const Loading = () => {
  return (
    <div className='w-full flex items-center justify-center py-10'>
      <div className='flex space-x-2'>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full bg-blue-500 animate-bounce`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
