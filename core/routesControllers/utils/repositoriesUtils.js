module.exports = {
    getNoteByCategory(categoriesRepository, notesRepository, category) {
        const queryVariants = categoriesRepository.get(category)
        return notesRepository.filter(note => 
            note.categories.some(categoryVariant => 
                queryVariants.find(queryVariant => categoryVariant === queryVariant)
            )
        )
    }
}