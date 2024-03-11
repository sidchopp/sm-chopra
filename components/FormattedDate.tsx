const FormattedDate: React.FC<{ date: string }> = ({ date }) => {
  if (!date) {
    return <span>Error: Invalid date</span>;
  }

  const dateObject = new Date(date);

  if (isNaN(dateObject.getTime())) {
    return <span>Error: Invalid time value</span>;
  }

  const readableDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(dateObject);

  return <span>{readableDate}</span>;
};

export { FormattedDate };
