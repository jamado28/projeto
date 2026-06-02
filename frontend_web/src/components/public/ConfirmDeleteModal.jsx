function ConfirmDeleteModal({
  show,
  title,
  message,
  onConfirm,
  onClose,
}) {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              {message}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>

              <button
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default ConfirmDeleteModal;