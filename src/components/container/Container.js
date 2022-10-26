import PropTypes from 'prop-types';
import style from 'styles/components/container/container.module.css';

export const Container = ({ header, children }) => {
  return (
    <section className={style.container}>
      <header className={style.headerContainer}>
        <h1 className={style.header}>{header}</h1>
      </header>
      <div className={style.child}>

        {/* styling for children node is NOT handled by this component */}
        <div className={style.content}>{children}</div>
      </div>
    </section>
  );
};

Container.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};