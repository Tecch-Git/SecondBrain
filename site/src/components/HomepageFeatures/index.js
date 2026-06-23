import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const DocAreas = [
  {
    title: 'KI-gestützte Entwicklung',
    description: 'Claude Code & Copilot Workflows, Prompting-Patterns.',
    to: '/docs/ki-entwicklung/intro',
  },
];

function DocAreaCard({title, description, to}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.docAreaCard}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {DocAreas.map((props, idx) => (
            <DocAreaCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
