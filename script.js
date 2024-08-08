// Ajouter un écouteur d'événements sur le formulaire pour intercepter la soumission
let form = document.getElementById('contactForm');
form.addEventListener('submit', function(event) {
    // Empêcher la soumission par défaut du formulaire
    event.preventDefault();

    // Effacer les messages d'erreur précédents
    let errors = document.querySelectorAll('.error');
    errors.forEach(function(error) {
        error.style.display = 'none';
    });

    // Variable pour vérifier si le formulaire est valide
    let isValid = true;

    // Bloc try pour gérer les validations
    try {
        // Validation du champ nom
        let name = document.getElementById('name').value;
        if (!name) {
            // Afficher un message d'erreur si le champ est vide
            let nameError = document.getElementById('nameError');
            nameError.textContent = "Le nom est obligatoire.";
            nameError.style.display = 'block';
            isValid = false; // Marquer le formulaire comme invalide
        }

        // Validation du champ téléphone
        let phone = document.getElementById('phone').value;
        // Expression régulière pour vérifier un numéro de téléphone de 10 chiffres
        let phonePattern = /^(0[1-9] ?\d{2} ?\d{2} ?\d{2} ?\d{2}|[1-9][0-9]{9})$/;
        if (!phone.match(phonePattern)) {
            // Afficher un message d'erreur si le numéro de téléphone est invalide
            let phoneError = document.getElementById('phoneError');
            phoneError.textContent = "Le téléphone doit être un numéro de 10 chiffres.";
            phoneError.style.display = 'block';
            isValid = false; // Marquer le formulaire comme invalide
        }
        // Validation du champ email
        let email = document.getElementById('email').value;
        // Expression régulière pour vérifier un format d'email
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email.match(emailPattern)) {
            // Afficher un message d'erreur si l'email est invalide
            let emailError = document.getElementById('emailError');
            emailError.textContent = "L'email n'est pas valide.";
            emailError.style.display = 'block';
            isValid = false; // Marquer le formulaire comme invalide
        }

        // Validation du champ message
        let message = document.getElementById('message').value;
        if (!message) {
            // Afficher un message d'erreur si le message est vide
            let messageError = document.getElementById('messageError');
            messageError.textContent = "Le message est obligatoire.";
            messageError.style.display = 'block';
            isValid = false; // Marquer le formulaire comme invalide
        }

        // Validation du champ fichier joint
        let fileInput = document.getElementById('file');
        let file = fileInput.files[0];
        if (file) {
            // Vérifier si le fichier est un PDF
            if (file.type !== 'application/pdf') {
                // Afficher un message d'erreur si le fichier n'est pas un PDF
                let fileError = document.getElementById('fileError');
                fileError.textContent = "Le fichier doit être au format PDF.";
                fileError.style.display = 'block';
                isValid = false; // Marquer le formulaire comme invalide
            } else if (file.size > 3 * 1024 * 1024) { // 3MB
                // Vérifier si la taille du fichier dépasse 3 Mo
                let fileError = document.getElementById('fileError');
                fileError.textContent = "Le fichier ne doit pas dépasser 3 Mo.";
                fileError.style.display = 'block';
                isValid = false; // Marquer le formulaire comme invalide
            }
        }

    } catch (error) {
        // Gestion des erreurs inattendues
        console.error("Une erreur est survenue lors de la validation du formulaire:", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
        isValid = false; // Marquer le formulaire comme invalide en cas d'erreur
    } finally {
        // Bloc finally pour exécuter du code indépendamment des résultats de try/catch
        if (isValid) {
            // Afficher un message de succès si le formulaire est valide
            alert("Formulaire soumis avec succès!");
        }
    }
});
