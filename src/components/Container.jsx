const Container = ({ children }) => {
  return (
    <div className="cat-flex cat-flex-col cat-items-center cat-gap-m cat-mv-m">
      {children}
    </div>
  );
};

export default Container;
