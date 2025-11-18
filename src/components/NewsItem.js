import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  const fullTitle = title || "No title available";
  const fullDescription = description || "Click below to read more.";

  const shortTitle = fullTitle.length > 80 ? fullTitle.slice(0, 80) + "..." : fullTitle;
  const shortDescription = fullDescription.length > 110 ? fullDescription.slice(0, 110) + "..." : fullDescription;

  const renderTooltip = (props) => (
    <Tooltip {...props} className="custom-tooltip">
      <div style={{ textAlign: 'left' }}>
        <strong>{fullTitle}</strong>
        <hr style={{ margin: '8px 0', borderColor: '#555' }} />
        <div style={{ fontSize: '0.9rem' }}>{fullDescription}</div>
      </div>
    </Tooltip>
  );

  return (
    <div className="my-4">
      <div className={`card h-100 border-0 shadow${props.mode === 'dark' ? '-lg' : ''}`}
        style={{
          borderRadius: '18px',
          backgroundColor: props.mode === 'dark' ? '#141e33' : 'white',
          transition: 'all 0.3s ease'
        }}>

        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
          <span className="badge bg-danger text-white fw-bold px-3 py-2">
            {source}
          </span>
        </div>

        <div style={{ height: '200px', background: '#f8f9fa' }}>
          <img
            src={imageUrl || "https://via.placeholder.com/400x200/f1f3f5/6c757d?text=No+Image"}
            alt="News"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="card-body d-flex flex-column" style={{ padding: '1.25rem' }}>

          {/* Title with Tooltip */}
          <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 200 }}
            overlay={renderTooltip}
          >
            <h5 className="card-title fw-bold mb-3" style={{
              fontSize: '1.1rem',
              lineHeight: '1.4',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              cursor: 'help'
            }}>
              {shortTitle}
            </h5>
          </OverlayTrigger>

          {/* Description */}
          <p className="card-text text-muted mb-4 flex-grow-1" style={{
            fontSize: '0.93rem',
            lineHeight: '1.5',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {shortDescription}
          </p>

          {/* Author & Date */}
          <div className="mt-auto">
            <small className="text-muted d-block">
              By <strong>{author || "Unknown"}</strong>
            </small>
            <small className="text-muted">
              {new Date(date).toGMTString().slice(0, -13)}
            </small>
          </div>

          <a href={newsUrl} target="_blank" rel="noreferrer"
            className={`btn btn-sm mt-3 w-100 fw-bold ${props.mode === 'dark'
              ? 'btn-warning text-dark'      // Golden button in dark mode
              : 'btn-primary'                // Classic blue in light mode
              }`}
            style={{ borderRadius: '10px', padding: '11px' }}>
            Read More →
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem;