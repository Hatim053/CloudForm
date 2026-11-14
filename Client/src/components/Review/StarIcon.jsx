function StarIcon({ filled, size = 18, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
        >
            <path
                d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"
                fill={filled ? "#f2a93b" : "none"}
                stroke={filled ? "#f2a93b" : "#c3d5c9"}
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default StarIcon;