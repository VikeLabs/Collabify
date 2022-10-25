import style from 'styles/components/container/container.module.css';

export const Container = ({ header, children }) => {
  return (
    <section className={style.container}>
      <div className={style.child}>
        <h1 className={style.header}>{header}</h1>
        <div className={style.content}>{children}</div>
      </div>
    </section>
  );
};
