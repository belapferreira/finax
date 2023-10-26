export const Footer = () => {
  return (
    <footer className="flex max-h-fit flex-wrap items-center justify-center gap-4 justify-self-end border border-b-0 border-l-0 border-r-0 border-gray-800 p-6 text-center">
      <div className="flex w-full max-w-app flex-col justify-between gap-4 text-sm text-gray-400 md:flex-row">
        <p className="md:text-start">
          This application is using the local storage to store entries data.
        </p>

        <p className="md:text-end">
          Developed by Bela Ferreira 💙 Contact:{' '}
          <a
            href="http://https://www.linkedin.com/in/belapferreira"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600"
          >
            https://www.linkedin.com/in/belapferreira
          </a>
        </p>
      </div>
    </footer>
  );
};
